const PrivacyPolicy = () => {
  if (!process.env.PRIVACY_POLICY_URL) return null;
  return (
    <div className="flex">
      <div className="flex-1 flex m-auto mt-12 flex-col items-center">
        <div className="mb-7">Privacy Policy</div>
        <div className="flex w-full">
          <iframe
            className="flex-1 md:mx-16"
            style={{ height: "70vh" }}
            src={process.env.PRIVACY_POLICY_URL}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
