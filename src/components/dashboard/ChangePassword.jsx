import React from "react";

const ChangePassword = () => {
  return (
    <div className="flex justify-center items-start py-10">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8"
        style={{ borderColor: "#E4F0F5" }}
      >
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold" style={{ color: "#122C55" }}>
            Change Password
          </h2>
          <p className="text-sm mt-1" style={{ color: "#A6BFCC" }}>
            Update your account password securely.
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-6">
          {/* OLD PASSWORD */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="old_password"
              className="text-sm font-medium"
              style={{ color: "#122C55" }}
            >
              Old Password
            </label>

            <input
              type="password"
              id="old_password"
              name="old_password"
              placeholder="Enter old password"
              className="px-4 py-2.5 rounded-lg border outline-none transition focus:ring-2"
              style={{
                borderColor: "#E4F0F5",
              }}
            />
          </div>

          {/* NEW PASSWORD */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="new_password"
              className="text-sm font-medium"
              style={{ color: "#122C55" }}
            >
              New Password
            </label>

            <input
              type="password"
              id="new_password"
              name="new_password"
              placeholder="Enter new password"
              className="px-4 py-2.5 rounded-lg border outline-none transition focus:ring-2"
              style={{
                borderColor: "#E4F0F5",
              }}
            />

            <p className="text-xs" style={{ color: "#A6BFCC" }}>
              Use at least 8 characters with a mix of letters & numbers.
            </p>
          </div>

          {/* SUBMIT BUTTON */}
          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-medium transition"
              style={{
                backgroundColor: "#F38E16",
                color: "#ffffff",
              }}
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
