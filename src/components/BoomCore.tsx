import Link from "next/link";

export function BoomCoreLogo({ small = false }: { small?: boolean }) {
  return (
    <Link href="/" className={small ? "core-logo core-logo-small" : "core-logo"} aria-label="CaseBoom">
      <span className="core-mark">
        <span className="core-ring core-ring-a" />
        <span className="core-ring core-ring-b" />
        <span className="core-ring core-ring-c" />
        <span className="core-pulse" />
        <b>CB</b>
      </span>
      <span className="core-word">CASE<span>BOOM</span></span>
    </Link>
  );
}

export function BoomCorePanel() {
  return (
    <div className="boom-core-panel">
      <div className="boom-core-big">
        <span className="core-ring core-ring-a" />
        <span className="core-ring core-ring-b" />
        <span className="core-ring core-ring-c" />
        <span className="core-pulse" />
        <b>CB</b>
      </div>
      <div>
        <h3>Boom Core</h3>
        <p>Энергетическое ядро CaseBoom: бонусы, апгрейды, кейсы и топ-дропы в одной системе.</p>
        <div className="core-status"><span /> CORE ONLINE</div>
      </div>
    </div>
  );
}
