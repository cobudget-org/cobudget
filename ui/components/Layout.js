import React from "react";
import Header from "./Header";
import "../lib/beacon";

const LinkOut = ({ href, children }) => {
  return (
    <a className="underline" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

const Layout = ({
  children,
  currentUser,
  fetchingUser,
  openModal,
  group,
  round,
  bucket,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Header
          currentUser={currentUser}
          fetchingUser={fetchingUser}
          openModal={openModal}
          group={group}
          round={round}
          bucket={bucket}
        />
        {children}
      </div>

      <div className="space-y-2 text-sm text-center mt-auto py-8 pb-20 text-gray-500">
        {/* NOTE TO PEOPLE WANTING TO EDIT THIS:
            Please see our license in the file /LICENSE in this repo for details on how you're allowed to change this section */}
        <div>
          You are using <LinkOut href="https://cobudget.com/">Cobudget</LinkOut>
          . Source code available{" "}
          <LinkOut href="https://github.com/cobudget/cobudget">online</LinkOut>.
        </div>
        <div className="space-x-6">
          {process.env.PRIVACY_POLICY_URL && (
            <LinkOut href="/privacy-policy">Privacy Policy</LinkOut>
          )}
          {process.env.TERMS_URL && (
            <LinkOut href="/terms-and-conditions">Terms and Conditions</LinkOut>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
