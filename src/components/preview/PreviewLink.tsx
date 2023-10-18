import styles from "./PreviewLink.module.scss";
import { platformsDropdown } from "../../util";
import { IPlatform } from "../../ts/models/platform.model";
import { IFirebaseLink } from "../../ts/models/firebase-link.model";
import arrowRightSvg from "../../assets/images/icon-arrow-right.svg";

const PreviewLink = ({ link, previewMode }: { link: IFirebaseLink; previewMode: boolean }) => {
    const { img, label, background } = platformsDropdown.find(item => item.value === link.platform) as IPlatform;

    const handleLinkClick = () => window.open(link.value);

    return (<div className={`${styles.container} ${previewMode ? styles['container--preview'] : ""}`} style={{ background }} onClick={handleLinkClick}>
        <div>
            <img src={img} alt="link-image" className={styles['container__image']} />
            <span>{label}</span>
        </div>

        <img src={arrowRightSvg} alt="arrow-right" />
    </div>);
}

export default PreviewLink;