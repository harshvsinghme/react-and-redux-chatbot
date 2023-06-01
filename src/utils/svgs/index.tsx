export const SvgBack = ({ goBack }: { goBack: () => void }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="currentColor"
      className="bi bi-arrow-left"
      viewBox="0 0 16 16"
      style={{
        border: "1px solid #000",
        borderRadius: "15px",
        cursor: "pointer",
      }}
      onClick={goBack}
    >
      {" "}
      <path
        fillRule="evenodd"
        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
      />{" "}
    </svg>
  );
};

export const SvgNav = () => {
  return (
    <svg viewBox="0 0 100 80" width="40" height="40">
      <rect width="100" height="20"></rect>
      <rect y="30" width="100" height="20"></rect>
      <rect y="60" width="100" height="20"></rect>
    </svg>
  );
};

export const SvgHome = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-house"
      viewBox="0 0 16 16"
      style={{
        cursor: "pointer",
      }}
    >
      {" "}
      <path
        fillRule="evenodd"
        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
      />{" "}
      <path
        fillRule="evenodd"
        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
      />{" "}
    </svg>
  );
};
