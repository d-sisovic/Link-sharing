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
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
} as Record<string, string | number | boolean | undefined>;


export const platformsDropdown = [
  {
    img: githubSvg,
    label: "GitHub",
    value: AvailablePlatform.GITHUB
  },
  {
    img: frontendMentorSvg,
    label: "Frontend Mentor",
    value: AvailablePlatform.FRONTEND_MENTOR
  },
  {
    img: twitterSvg,
    label: "Twitter",
    value: AvailablePlatform.TWITTER
  },
  {
    img: linkedinSvg,
    label: "LinkedIn",
    value: AvailablePlatform.LINKEDIN
  },
  {
    img: youtubeSvg,
    label: "YouTube",
    value: AvailablePlatform.YOUTUBE
  },
  {
    img: facebookSvg,
    label: "Facebook",
    value: AvailablePlatform.FACEBOOK
  },
  {
    img: twitchSvg,
    label: "Twitch",
    value: AvailablePlatform.TWITCH
  },
  {
    img: devToSvg,
    label: "Dev.to",
    value: AvailablePlatform.DEVTO
  },
  {
    img: codewarsSvg,
    label: "Codewars",
    value: AvailablePlatform.CODEWARS
  },
  {
    img: codepenSvg,
    label: "Codepen",
    value: AvailablePlatform.CODEPEN
  },
  {
    img: freeCodeCampSvg,
    label: "freeCodeCamp",
    value: AvailablePlatform.FREE_CODE_CAMP
  },
  {
    img: gitlabSvg,
    label: "GitLab",
    value: AvailablePlatform.GITLAB
  },
  {
    img: hashnodeSvg,
    label: "Hashnode",
    value: AvailablePlatform.HASHNODE
  },
  {
    img: stackoverflowSvg,
    label: "Stack Overflow",
    value: AvailablePlatform.STACK_OVERFLOW
  }
];