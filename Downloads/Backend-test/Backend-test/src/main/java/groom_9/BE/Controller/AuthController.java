package groom_9.BE.Controller;

import groom_9.BE.Common.ApiResponse;
import groom_9.BE.DTO.MemberRequestDto;
import groom_9.BE.DTO.UserDto;
import groom_9.BE.DTO.UserResponseDto;
import groom_9.BE.Domain.User;
import groom_9.BE.Service.AuthService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;//CORS 세팅 추가했습니다!

import java.net.URI;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173") //CORS 세팅 추가했습니다!
@RestController
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Value("${kakao.client_id}")
    private String clientId;

    @Value("${kakao.redirect_uri}")
    private String redirectUri;
    // 여기 추가했습니다!
    @Value("${frontend.redirect_uri}")
    private String frontendRedirectUri;

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<String>> handleIllegalArgumentException(IllegalArgumentException ex) {
        log.error("IllegalArgumentException: {}", ex.getMessage());
        return ApiResponse.onFailure(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @Operation(summary = "카카오 로그인 이동 URL 생성",
            description = "사용자가 카카오 로그인 버튼 클릭 시 이동할 인증 URL을 반환합니다."
    )
    @GetMapping("/request")
    public ResponseEntity<String> getKaKaoUri() {
        String requestUrl = "https://kauth.kakao.com/oauth/authorize"
                + "?client_id=" + clientId
                + "&redirect_uri=" + redirectUri
                + "&response_type=code";
        return ResponseEntity.ok(requestUrl);
    }

    // 전달 받은 인증 코드에 접근해 토큰 요청 후 user 확인
    @Hidden
    @GetMapping("/member/kakao")
    public ResponseEntity<Void> getKakaoUser(
            @RequestParam("code") String code
    ) {
        log.info("Received code={} for backend redirectUri={}", code, redirectUri);

        // 1) 토큰 교환 및 유저 정보 저장
        String accessToken = authService.getAccessToken(code, redirectUri);
        Map<String, Object> userInfo = authService.getUserInfo(accessToken);
        String kakaoId   = userInfo.get("id").toString();
        String nickname  = userInfo.get("nickname").toString();
        String imageUrl  = userInfo.get("imageUrl").toString();
        UserResponseDto dto = authService.saveUserKakao(kakaoId, nickname, imageUrl);

        // 2) 프론트엔드로 리다이렉트 여기 추가 했습니다!
        URI redirectUri = UriComponentsBuilder
                .fromUriString(frontendRedirectUri)
                .queryParam("userId", dto.getUserId())
                .queryParam("isNewUser", dto.isNewUser())
                .build()
                .toUri();
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(redirectUri);
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    @Operation(summary = "회원 정보 입력 및 가입 완료",
            description = "회원 가입 시 나이, 성별 등의 정보를 입력합니다."
    )
    @PostMapping("/member/info")
    public ResponseEntity<ApiResponse<Object>> setMemberInfo(@RequestBody MemberRequestDto memberRequest){
        log.info("입력받은 memberRequest={}",memberRequest);
        User user = authService.setMemberInfo(memberRequest);
        String id = user.getId().toHexString();

        return ApiResponse.onSuccess("성공적으로 회원가입 되었습니다. id=", HttpStatus.OK, id);
    }

    @Operation(summary = "유저 프로필 정보 조회",
            description = "사용자 ID로 유저의 프로필 정보(닉네임, 이미지, 키워드 등)를 조회합니다."
    )
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<Object>> getUser(@PathVariable("userId") String id) {
        log.info("입력받은 Id={}",id);

        UserDto userDto = new UserDto(authService.findUserInfo(id));
        return ApiResponse.onSuccess("성공입니다.", HttpStatus.OK, userDto);
    }

    @Operation(summary = "회원 탈퇴",
            description = "사용자 ID로 회원 탈퇴를 진행합니다."
    )
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<ApiResponse<Object>> deleteUser(@PathVariable("userId") String id) {
        log.info("입력받은 Id={}",id);
        authService.deleteUser(id);
        return ApiResponse.onSuccess("성공적으로 삭제되었습니다.", HttpStatus.OK);
    }

}
