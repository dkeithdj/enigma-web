import React from "react";

const Notification = () => {
  return (
    <div className="flex justify-center items-center text-center p-2 bg-theme_primary text-theme_text-light">
      <p>
        🧑👩 Committee Recruitment is still ongoing! Register{" "}
        <span>
          <a
            href="https://forms.gle/DxHE5uu2biRwLsYP9"
            className="underline hover:text-red-500 hover:transition-all hover:duration-200"
          >
            here
          </a>
        </span>
      </p>
    </div>
  );
};

export default Notification;
