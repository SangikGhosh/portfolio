import React from "react";
import GitHubCalendar from "react-github-calendar";

function GithubCal() {
  return (
    <div className="flex-col items-center pb-10 bg-[#000000] text-white hidden sm:flex">
      <h1 className="text-2xl font-bold pb-5">
        Days I <strong className="text-blue-600">Code</strong>
      </h1>
      <GitHubCalendar
        username="SangikGhosh"
        blockSize={15}
        blockMargin={5}
        fontSize={16}
      />
    </div>
  );
}

export default GithubCal;