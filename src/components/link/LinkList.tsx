import LinkItem from "./LinkItem";
import { ILinkList } from "./ts/models/link-list.model";

const LinkList = ({ links, formValidity, baseIndex, removeLinkHandler, formValidityHandler }: ILinkList) => {
    const data = links.map((link, index) => (<LinkItem key={link.id} formValidity={formValidity} link={link} index={baseIndex + index}
        removeLinkHandler={removeLinkHandler} formValidityHandler={formValidityHandler} />));

    return <>{data}</>;
}

export default LinkList;
