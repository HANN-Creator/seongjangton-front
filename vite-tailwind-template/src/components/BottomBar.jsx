const BottomBar = () => {
  const pathname = window.location.pathname;

  const getIconSrc = (type) => {
    if (pathname.includes(type)) {
      return `/assets/${type}.svg`;
    } else {
      return `/assets/none_${type}.svg`;
    }
  };

  return (
    <div
      style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.08)" }}
      className="fixed max-w-[360px] bottom-0 w-full flex justify-between items-center bg-white pt-4 pb-8 px-[46px] z-50"
    >
      <div>
        <img src={getIconSrc("report")} alt="report" className="w-6 h-6" />
      </div>
      <div>
        <img src={getIconSrc("home")} alt="home" className="w-6 h-6" />
      </div>
      <div>
        <img src={getIconSrc("mypage")} alt="mypage" className="w-6 h-6" />
      </div>
    </div>
  );
};

export default BottomBar;
