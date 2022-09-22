import React from "react";
import { HexColorPicker } from "react-colorful";
import { toPng } from "html-to-image";

interface IInputCardProps {
  username: string;
  discriminator: string;
  avatar: string;
  avatar_url: string;
  accent: string;
  card: React.RefObject<HTMLDivElement>;
  full: React.RefObject<HTMLDivElement>;
  list: React.RefObject<HTMLDivElement>;
  onChange: (cardState: IInputCardState) => void;
}

interface IInputCardState {
  username: string;
  discriminator: string;
  avatar: string;
  avatar_url: string;
  accent: string;
  status: string;
  about_me: string;
  bio: string;
  note: string;
  click_to_add_a_note: string;
  card: React.RefObject<HTMLDivElement>;
  full: React.RefObject<HTMLDivElement>;
  list: React.RefObject<HTMLDivElement>;
  colorChangerPopup: boolean;
}

export default class InputCard extends React.Component<
  IInputCardProps,
  IInputCardState
> {
  constructor(props: IInputCardProps) {
    super(props);
    this.state = {
      username: this.props.username,
      discriminator: this.props.discriminator,
      avatar: this.props.avatar,
      avatar_url: this.props.avatar_url,
      accent: this.props.accent,
      status: "",
      about_me: "About me",
      bio: "Bio",
      note: "Note",
      click_to_add_a_note: "Click to add a note",
      card: React.createRef(),
      full: React.createRef(),
      list: React.createRef(),
      colorChangerPopup: false,
    };
  }

  shouldComponentUpdate(
    nextProps: Readonly<IInputCardProps>,
    nextState: Readonly<IInputCardState>,
    nextContext: any
  ): boolean {
    return this.state !== nextState;
  }

  componentDidUpdate(
    prevProps: Readonly<IInputCardProps>,
    prevState: Readonly<IInputCardState>,
    snapshot?: any
  ): void {
    this.props.onChange(this.state);
  }

  static getDerivedStateFromProps(
    nextProps: Readonly<IInputCardProps>,
    nextState: Readonly<IInputCardState>
  ) {
    if (nextProps.avatar !== nextState.avatar) {
      return {
        username: nextProps.username,
        discriminator: nextProps.discriminator,
        avatar: nextProps.avatar,
        accent: nextState.accent,
      };
    }

    return null;
  }

  downloadImage = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      toPng(ref.current).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${this.state.username}#${this.state.discriminator}.png`;
        link.href = dataUrl;
        link.click();
      });
    }
  };

  uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({ avatar_url: reader.result as string });
      };
    }
  };

  createUrl = () => {
    let url = "http://localhost:5173/profile?id=custom";
    for (const [key, value] of Object.entries(this.state)) {
      if (
        key !== "card" &&
        key !== "full" &&
        key !== "list" &&
        key !== "colorChangerPopup"
      ) {
        url += `&${key}=${value}`;
      }
    }
    return url;
  };

  changerInput = (title: string) => {
    const titleSafeName = title.toLowerCase().replace(/ /g, "_");
    return (
      <div>
        <label className="label">
          <span className="label-text">{title}</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => {
            if (
              e.target.value == "" &&
              !"Status Username Discriminator".includes(title) // can be empty
            ) {
              this.setState({
                [titleSafeName]: title,
              } as any); // https://stackoverflow.com/questions/46361905/property-is-missing-in-type-x-string-string
              return;
            }
            this.setState({
              [titleSafeName]: e.target.value,
            } as any);
          }}
          className="input input-bordered w-full max-w-xs bg-discord-dark"
        />
      </div>
    );
  };

  modalBox = () => {
    return (
      <div>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Do you want to reset all the changes?
            </h3>
            <p className="py-4">
              Remember this is irreversible, so make sure you want to reset
            </p>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn btn-ghost">
                Cancel
              </label>
              <button
                className="btn btn-error"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Yes, reset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="card w-96 bg-discord-dark shadow-xl ml-4">
        <div className="card-body">
          <h2 className="card-title mb-6">Customize!</h2>
          <div className="w-full max-w-xs grid grid-cols-2 gap-4">
            {this.changerInput("Username")}
            {this.changerInput("Discriminator")}
            {this.changerInput("About me")}
            {this.changerInput("Bio")}
            {this.changerInput("Note")}
            {this.changerInput("Click to add a note")}
            {this.changerInput("Status")}
            {this.changerInput("Avatar Url")}

            <button
              className="btn mt-4 border-none"
              style={{ backgroundColor: this.state.accent }}
              onClick={() => {
                this.setState({
                  colorChangerPopup: !this.state.colorChangerPopup,
                });
              }}
            >
              <div className="invert" style={{ color: this.state.accent }}>
                Change color
              </div>
            </button>

            <div className="mt-4">
              <label htmlFor="actual-btn" className="btn w-full">
                Upload file
              </label>
              <input
                className="invisible"
                type="file"
                id="actual-btn"
                onChange={this.uploadPhoto}
              />
            </div>

            <div
              className={
                (this.state.colorChangerPopup ? "" : "invisible") +
                " z-10 absolute bottom-[190px] left-2"
              }
            >
              <HexColorPicker
                color={this.state.accent}
                onChange={(newAccent) => {
                  this.setState(() => ({
                    accent: newAccent,
                  }));
                }}
              />
            </div>
          </div>

          <div className="flex flex-row gap-2 mt-1">
            <div className="dropdown dropdown-top w-1/2">
              <label tabIndex={0} className="btn btn-primary">
                Download images
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-2xl bg-white bg-opacity-10 backdrop-blur-3xl rounded-box w-40 space-y-4 mb-3"
              >
                <li>
                  <button
                    onClick={() => this.downloadImage(this.props.card)}
                    className="btn bg-discord border-none"
                  >
                    Card
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => this.downloadImage(this.props.full)}
                    className="btn bg-discord border-none"
                  >
                    Full
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => this.downloadImage(this.props.list)}
                    className="btn bg-discord border-none"
                  >
                    List
                  </button>
                </li>
              </ul>
            </div>
            <label htmlFor="my-modal" className="cursor-pointer btn w-[49%]">
              reset
            </label>
          </div>

          <div className="mx-auto">
            <button
              id="copy"
              onClick={() => {
                navigator.clipboard.writeText(this.createUrl());
                document.getElementById("copy")!.innerHTML = "Copied!";
                setTimeout(() => {
                  document.getElementById("copy")!.innerHTML = "Copy link";
                }, 3000);
              }}
            >
              Copy link
            </button>
          </div>
        </div>
        {this.modalBox()}
      </div>
    );
  }
}
