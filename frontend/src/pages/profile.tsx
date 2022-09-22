import React from "react";
import axios from "axios";
import { FastAverageColor } from "fast-average-color";
import { useSearchParams, Navigate } from "react-router-dom";
import ProfileCard from "../components/profileCard";
import ProfileFull from "../components/profileFull";
import ProfileInList from "../components/profileInList";
import ProfileListColumn from "../components/profileListColumn";
import InputCard from "../components/inputCard";

const fac = new FastAverageColor();

interface IProfilePageProps {
  id: string;
  searchParams: URLSearchParams;
}

interface IProfilePageState {
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

class ProfilePage extends React.Component<
  IProfilePageProps,
  IProfilePageState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: this.props.searchParams.get("username") || "",
      discriminator: this.props.searchParams.get("discriminator") || "",
      avatar: this.props.searchParams.get("avatar") || "",
      avatar_url: this.props.searchParams.get("avatar_url") || "",
      accent: this.props.searchParams.get("accent") || "",
      status: this.props.searchParams.get("status") || "",
      about_me: this.props.searchParams.get("about_me") || "About me",
      bio: this.props.searchParams.get("bio") || "Bio",
      note: this.props.searchParams.get("note") || "Note",
      click_to_add_a_note:
        this.props.searchParams.get("click_to_add_a_note") ||
        "Click to add a note",
      card: React.createRef(),
      full: React.createRef(),
      list: React.createRef(),
      colorChangerPopup: false,
    };

    document.body.style.overflow = "hidden";
  }

  componentDidMount(): void {
    if (this.state.avatar_url && this.state.accent == "") {
      this.setColor(this.state.avatar_url);
    }

    if (this.props.id == "0") {
      return;
    }

    axios({
      method: "post",
      url: "https://dcfakerbackend.gooblin.gq/getuser",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: this.props.id,
      },
    }).then((response) => {
      const avatar_url = `https://cdn.discordapp.com/avatars/${this.props.id}/${response.data.avatar}.webp?size=512`;

      this.setColor(avatar_url);

      this.setState(() => ({
        username:
          this.state.username == ""
            ? response.data.username
            : this.state.username,
        discriminator:
          this.state.discriminator == ""
            ? response.data.discriminator
            : this.state.discriminator,
        avatar: response.data.avatar,
        avatar_url: avatar_url,
      }));
    });
  }

  setColor = (avatar: string) => {
    fac
      .getColorAsync(avatar)
      .then((color) => {
        this.setState(() => ({
          accent: color.hex,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.accent == "") {
      return (
        <progress className="progress w-1/2 absolute top-1/2 right-1/2 transform translate-x-1/2"></progress>
      );
    }

    return (
      <div>
        <div className="mx-auto relative w-[1400px]">
          <div
            ref={this.state.card}
            id="card"
            className="absolute left-20 top-5"
          >
            <ProfileCard id={this.props.id} {...this.state} />
          </div>

          <div
            ref={this.state.full}
            id="full"
            className="absolute left-20 top-[360px]"
          >
            <ProfileFull id={this.props.id} {...this.state} />
          </div>

          <div className="absolute right-32 top-16">
            <InputCard
              {...this.state}
              onChange={(cardState) => {
                this.setState(cardState);
              }}
            />
          </div>
        </div>

        <div
          ref={this.state.list}
          id="list"
          className="absolute top-40 right-0 z-10"
        >
          <ProfileInList id={this.props.id} {...this.state} />
        </div>
        <div className="absolute top-0 right-0">
          <ProfileListColumn id={this.props.id} count={23} {...this.state} />
        </div>
      </div>
    );
  }
}

export default function Profile() {
  const [searchParams] = useSearchParams();

  if (searchParams.get("id") == "custom") {
    return <ProfilePage id="0" searchParams={searchParams} />;
  }

  if (isNaN(Number(searchParams.get("id")))) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <ProfilePage
      id={searchParams.get("id") as string}
      searchParams={searchParams}
    />
  );
}
