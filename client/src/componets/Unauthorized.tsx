import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <h1 className="font-semibold text-2xl">Unauthorized</h1>
      <br />
      <p className="font-medium">
        You do not have access to the requested page.
      </p>
      <div className="flex-grow mt-3">
        <button
          className="bg-indigo-500 text-white text-lg px-3 py-2 rounded"
          onClick={goBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
