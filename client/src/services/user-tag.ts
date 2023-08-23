import { socket } from "@/socket";
import { create } from "zustand";
import type {
  UserTag,
  UserTagCreate,
  UserTagUpdate,
} from "biseo-interface/user/tag";

interface UserTagState {
  userTags: UserTag[];
  createTag: (tag: UserTagCreate) => void;
  retrieveAll: () => void;
  updateTag: (tag: UserTagUpdate) => void;
  deleteTag: (id: number) => void;
}

export const useUserTag = create<UserTagState>(set => ({
  userTags: [],

  createTag: async tag => {
    try {
      await socket.emitAsync("user.tag.create", tag);
    } catch (error) {
      // TODO: handle error
    }
  },

  retrieveAll: async () => {
    try {
      const retUserTags = await socket.emitAsync("user.tag.retrieveAll", {});
      set({ userTags: retUserTags });
    } catch (error) {
      // TODO: handle error
    }
  },

  updateTag: async tag => {
    try {
      await socket.emitAsync("user.tag.update", tag);
    } catch (error) {
      // TODO: handle error
    }
  },

  deleteTag: async id => {
    try {
      await socket.emitAsync("user.tag.delete", { id });
    } catch (error) {
      // TODO: handle error
    }
  },
}));

socket.on("user.tag.created", userTag => {
  useUserTag.setState(state => ({
    userTags: [...state.userTags, userTag],
  }));
});

socket.on("user.tag.updated", userTag => {
  useUserTag.setState(state => {
    const newTags: UserTag[] = state.userTags.map(tag => {
      if (tag.id === userTag.id) {
        return userTag;
      }
      return tag;
    });
    return {
      userTags: newTags,
    };
  });
});

socket.on("user.tag.deleted", userTag => {
  useUserTag.setState(state => {
    const newTags: UserTag[] = state.userTags.filter(
      tag => tag.id !== userTag.id,
    );
    return {
      userTags: newTags,
    };
  });
});
