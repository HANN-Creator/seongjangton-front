import { motion } from "framer-motion";
import KakaoLoginButton from "../components/KakaoLoginButton";

export default function LoginPage() {
  return (
    <div className="app-viewport">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen flex flex-col items-center justify-center 
             bg-gradient-to-b from-[#E7FCF7] to-white p-4"
      >
        {/* 로고와 슬로건 애니메이션 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-center mb-12"
        >
          <img
            src="/assets/logo.svg"
            alt="RoutineApp Logo"
            className="w-32 h-32 mb-4"
          />
          <p
            className="absolute
          left-1/2
          -translate-x-1/2 top-[232px]
          w-[260px] h-[14px]
          font-pretendard font-normal text-[12px] leading-normal tracking-normal text-center"
          >
            반복되는 일상도 꾸준히, 지치지 않게, 나답게.
          </p>
        </motion.div>

        {/* 버튼 애니메이션 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute left-[20px] top-[703px] w-[320px] h-[54px]"
        >
          <KakaoLoginButton
            onSuccess={(data) => console.log(data)}
            onFailure={(err) => console.error(err)}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
