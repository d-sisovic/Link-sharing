import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { toastrConfig } from '../util';
import { Firebase } from '../ts/enums/firebase.enum';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFirebaseLink } from '../ts/models/firebase-link.model';
import { getDocs, query, collection, orderBy } from 'firebase/firestore';

const initialState = { loading: true, links: [] } as { loading: boolean; links: IFirebaseLink[] };

const getAllLinkIds = (links: IFirebaseLink[]) => {
  return links.map(link => link.id);
};

const getNewLinksToSave = (links: IFirebaseLink[], existingIds: string[]) => {
  return links.filter(link => !existingIds.includes(link.id));
};

const getUpdatedLinksToSave = (existingLinks: IFirebaseLink[], linksToSave: IFirebaseLink[]) => {
  return existingLinks.map(link => linksToSave.find(linkToSave => link.id === linkToSave.id) || link);
};

export const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    setLinksOnSave: (state, action) => {
      const { links } = action.payload;
      const { links: existingLinks } = state;

      const allLinkIds = getAllLinkIds(existingLinks);
      const newLinks = getNewLinksToSave(links, allLinkIds);
      const updatedLinks = getUpdatedLinksToSave(existingLinks, links);

      state.loading = false;
      state.links = [...updatedLinks, ...newLinks];
    },
    setLinksLoading: (state, action) => {
      const { loading } = action.payload;

      state.loading = loading;
    },
    setLinks: (state, action) => {
      const { links } = action.payload;

      state.links = links;
    },
    filterLinks: (state, action) => {
      const { linkId } = action.payload;

      state.links = state.links.filter(link => link.id !== linkId);
    }
  },
  extraReducers: (builder) => builder
    .addCase(fetchLinks.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchLinks.fulfilled, (state, action) => {
      state.loading = false;
      state.links = action.payload;
    })
    .addCase(fetchLinks.rejected, (state) => {
      state.links = [];
      state.loading = false;
      toast.error('Error fetching links. Please try again!', toastrConfig);
    })
});

export const fetchLinks = createAsyncThunk('links/fetchLinks', async (userId: string) => {
  const querySnapshot = await getDocs(query(collection(db, Firebase.COLLECTION + userId), orderBy('index')));

  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as IFirebaseLink[];
});

export const { setLinks, filterLinks, setLinksLoading, setLinksOnSave } = linksSlice.actions;

export default linksSlice.reducer;