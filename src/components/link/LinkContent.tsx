import { useMemo } from "react";
import LinkList from "./LinkList";
import LinkIntro from "./LinkIntro";
import auth from "../../../firebase";
import { toastrConfig } from "../../util";
import styles from "./LinkContent.module.scss";
import { DropResult } from "@hello-pangea/dnd";
import { setLinks } from "../../store/link-store";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/components/spinner/Spinner";
import { AppDispatch, RootState } from "../../store/store";
import { ILinkContent } from "./ts/models/link-content.model";
import commonStyles from "../../styles/common/link-profile.module.scss";
import { reorderLinks, deleteLinkFromDb, setLinkToDb } from "./link-util";

const LinkContent = ({ newFirebaseLinks, formValidity, onRemoveLink, formValidityHandler }: ILinkContent) => {
    const dispatch = useDispatch<AppDispatch>();
    const { links, loading } = useSelector((state: RootState) => state.list);

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) { return; }

        const userId = auth.currentUser?.uid || "";
        const reorderedLinks = reorderLinks(links, result.source.index, result.destination.index);

        try {
            dispatch(setLinks({ links: reorderedLinks }));

            await Promise.all(reorderedLinks.map(link => deleteLinkFromDb(link.id, userId)));
            await Promise.all(reorderedLinks.map((link, index) => setLinkToDb(link, index, userId)));
        } catch {
            dispatch(setLinks({ links }));
            toast.error('Error reordering links. Please try again!', toastrConfig);
        }
    };

    const ToastrMemo = useMemo(() => <ToastContainer position="top-right" autoClose={3000} theme="colored" />, []);

    const loaderStyle = useMemo(() => loading && `${styles['container--loader']}`, [loading]);
    const linkContainerStyle = useMemo(() => !loading && links.length !== 0 ? `${styles['container--links']}` : '', [links.length, loading]);

    return <div className={`${commonStyles.subcontainer} ${linkContainerStyle} ${loaderStyle}`}>
        {ToastrMemo}

        {loading && <Spinner size={4} />}

        {!loading && <>
            {newFirebaseLinks.length === 0 && links.length === 0 && <LinkIntro />}

            {newFirebaseLinks.length !== 0 && <LinkList onDragEnd={onDragEnd} baseIndex={links.length} removeLinkHandler={onRemoveLink} formValidity={formValidity}
                formValidityHandler={formValidityHandler} links={newFirebaseLinks} />}

            {links.length !== 0 && <LinkList onDragEnd={onDragEnd} baseIndex={0} removeLinkHandler={onRemoveLink}
                formValidity={formValidity} formValidityHandler={formValidityHandler} links={links} />}
        </>}
    </div>;
};

export default LinkContent;

