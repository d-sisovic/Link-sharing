import auth from "../firebase";
import devToSvg from "./assets/images/icon-devto.svg";
import twitchSvg from "./assets/images/icon-twitch.svg";
import githubSvg from "./assets/images/icon-github.svg";
import gitlabSvg from "./assets/images/icon-gitlab.svg";
import codepenSvg from "./assets/images/icon-codepen.svg";
import twitterSvg from "./assets/images/icon-twitter.svg";
import youtubeSvg from "./assets/images/icon-youtube.svg";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import facebookSvg from "./assets/images/icon-facebook.svg";
import linkedinSvg from "./assets/images/icon-linkedin.svg";
import codewarsSvg from "./assets/images/icon-codewars.svg";
import hashnodeSvg from "./assets/images/icon-hashnode.svg";
import freeCodeCampSvg from "./assets/images/icon-freecodecamp.svg";
import stackoverflowSvg from "./assets/images/icon-stack-overflow.svg";
import { AvailablePlatform } from "./ts/enums/available-platform.enum";
import frontendMentorSvg from "./assets/images/icon-frontend-mentor.svg";

export const emailAsyncValidator = async (email: string) => {
  const emailInUse = "Email already in use";

  try {
      const result = await fetchSignInMethodsForEmail(auth, email);

      return !result.length ? true : emailInUse;
  } catch {
      return emailInUse;
  }
};

export const debounce = (callbackFn: (args: string[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return function (...args: string[]) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callbackFn(args);
    }, delay);
  };
}

export const toastrConfig = {
  toastId: "custom-id",
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: "dark",
} as Record<string, string | number | boolean | undefined>;


export const platformsDropdown = [
  {
    background: "#1A1A1A",
    img: githubSvg,
    label: "GitHub",
    value: AvailablePlatform.GITHUB
  },
  {
    background: "#FFF",
    img: frontendMentorSvg,
    label: "Frontend Mentor",
    value: AvailablePlatform.FRONTEND_MENTOR
  },
  {
    background: "#43B7E9",
    img: twitterSvg,
    label: "Twitter",
    value: AvailablePlatform.TWITTER
  },
  {
    background: "#2D68FF",
    img: linkedinSvg,
    label: "LinkedIn",
    value: AvailablePlatform.LINKEDIN
  },
  {
    background: "#EE3939",
    img: youtubeSvg,
    label: "YouTube",
    value: AvailablePlatform.YOUTUBE
  },
  {
    background: "#2442AC",
    img: facebookSvg,
    label: "Facebook",
    value: AvailablePlatform.FACEBOOK
  },
  {
    background: "#EE3FC8",
    img: twitchSvg,
    label: "Twitch",
    value: AvailablePlatform.TWITCH
  },
  {
    background: "#333",
    img: devToSvg,
    label: "Dev.to",
    value: AvailablePlatform.DEVTO
  },
  {
    background: "#8A1A50",
    img: codewarsSvg,
    label: "Codewars",
    value: AvailablePlatform.CODEWARS
  },
  {
    background: "#010101",
    img: codepenSvg,
    label: "Codepen",
    value: AvailablePlatform.CODEPEN
  },
  {
    background: "#302267",
    img: freeCodeCampSvg,
    label: "freeCodeCamp",
    value: AvailablePlatform.FREE_CODE_CAMP
  },
  {
    background: "#EB4925",
    img: gitlabSvg,
    label: "GitLab",
    value: AvailablePlatform.GITLAB
  },
  {
    background: "#0330D1",
    img: hashnodeSvg,
    label: "Hashnode",
    value: AvailablePlatform.HASHNODE
  },
  {
    background: "#EC7100",
    img: stackoverflowSvg,
    label: "Stack Overflow",
    value: AvailablePlatform.STACK_OVERFLOW
  }
];