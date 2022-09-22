import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();

  const goNext = () => {
    const id = (document.getElementById("idInput") as HTMLInputElement).value;
    if (!id) {
      return;
    }
    navigate("/profile?id=" + id);
  };

  return (
    <div>
      <div className="card w-96 bg-discord-darker shadow-xl mx-auto mt-52">
        <div className="card-body">
          <h2 className="card-title">Who should we mock today?</h2>

          <div className="flex flex-row">
            Type in the victim's Discord ID
            <a
              href="https://www.youtube.com/watch?v=ZPROrf4Fe3Q"
              className="text-xs ml-2"
            >
              the what?
            </a>
          </div>

          <input
            id="idInput"
            type="text"
            placeholder="Discord ID"
            className="input input-bordered w-full max-w-xs bg-discord-dark"
          />
          <div className="card-actions justify-end">
            <button
              className="btn btn-accent bg-discord-accent"
              onClick={() => goNext()}
            >
              Mock em
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
