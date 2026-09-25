import PropTypes from "prop-types";
import { journey, profile, statsSnapshot } from "../data/content";

const K = ({ children }) => <span className="text-[#FF8B73]">{children}</span>;
K.propTypes = { children: PropTypes.node };

function Neofetch({ solved, contributions }) {
  const rows = [
    ["role", "Jr. AI Engineer"],
    ["focus", "agents · rag · llms"],
    ["backend", "fastapi · spring boot"],
    ["mobile", "flutter"],
    ["langs", "python · java · dart"],
    ["leetcode", `${solved} solved`],
    ["github", `${contributions.toLocaleString("en-IN")} contributions / yr`],
    ["status", profile.availability.toLowerCase()],
  ];
  return (
    <div className="flex gap-[1.1em] py-[0.35em]">
      <div className="grid h-[5.6em] w-[5.6em] shrink-0 place-items-center rounded-[0.55em] bg-[#0A0908] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <span className="font-display text-[2.1em] font-black leading-none tracking-[-0.05em] text-white">
          SG<span className="text-[#FF3B2F]">.</span>
        </span>
      </div>
      <div className="min-w-0 leading-[1.6]">
        <p className="text-[#EAE3D6]">
          <K>sangik</K>@<K>kolkata</K>
        </p>
        <p className="text-[#4A4640]">──────────────</p>
        {rows.map(([k, v]) => (
          <p key={k} className="truncate">
            <K>{k}</K>
            <span className="text-[#6D6A64]"> · </span>
            <span className="text-[#EAE3D6]">{v}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
Neofetch.propTypes = { solved: PropTypes.number, contributions: PropTypes.number };

/** What the terminal runs once it takes the stage — every line is real. */
export function buildScript(live) {
  const solved = live?.leetcode?.solved ?? statsSnapshot.leetcodeSolved;
  const contributions = live?.github?.contributions ?? statsSnapshot.contributions;
  return [
    { cmd: "neofetch", out: <Neofetch solved={solved} contributions={contributions} /> },
    {
      cmd: "ls ~/projects",
      out: (
        <p className="flex flex-wrap gap-x-[1.4em] font-medium text-[#8FB4F5]">
          {["realtime-chat-app/", "FileHiderService/", "MLBB/", "portfolio/"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </p>
      ),
    },
    { cmd: "cat ~/now.md", out: <p className="text-[#C9C3B8]">{journey[0].body}</p> },
    {
      cmd: "python3 -c 'import this' | sed -n 3,5p",
      out: (
        <div className="text-[#C9C3B8]">
          <p>Beautiful is better than ugly.</p>
          <p>Explicit is better than implicit.</p>
          <p>Simple is better than complex.</p>
        </div>
      ),
    },
    {
      cmd: "./say-hello.sh",
      out: (
        <div>
          <p className="text-[#8BEEA6]">→ {profile.email}</p>
          <p className="text-[#A5A29E]">→ or press C to jump to contact</p>
        </div>
      ),
    },
  ];
}
