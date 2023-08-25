import { socket } from "@/socket";
import { create } from "zustand";
import type {
  UserTagi,
  UserTagCreate,
  UserTagUpdate,
} from "@biseo/interface/user/tag";

interface UserTagState {
  userTags: UserTagi[];
  createTag: (tag: UserTagCreate) => void;
  retrieveAll: () => void;
  updateTag: (tag: UserTagUpdate) => void;
  deleteTag: (id: number) => void;
}

export const useUserTagi = create<UserTagState>(set => ({
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
  useUserTagi.setState(state => ({
    userTags: [...state.userTags, userTag],
  }));
});

socket.on("user.tag.updated", userTag => {
  useUserTagi.setState(state => {
    const newTags: UserTagi[] = state.userTags.map(tag => {
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
  useUserTagi.setState(state => {
    const newTags: UserTagi[] = state.userTags.filter(
      tag => tag.id !== userTag.id,
    );
    return {
      userTags: newTags,
    };
  });
});
