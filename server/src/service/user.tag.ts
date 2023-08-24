import type { Prisma } from "@prisma/client";
import * as schema from "@biseo/interface/user/tag";
import { prisma } from "@/db/prisma";

export const createTag = async ({
  title,
  description,
  users,
}: schema.UserTagCreate) => {
  const createTagQuery: Prisma.TagCreateInput = {
    title,
    description,
    users: {
      create: users.map(user => ({ userId: user })),
    },
  };

  const { users: createdUsers, ...createdTag } = await prisma.tag.create({
    data: createTagQuery,
    select: {
      id: true,
      title: true,
      description: true,
      users: {
        select: {
          userId: true,
        },
      },
    },
  });

  const tagWithUsers: schema.UserTag = {
    ...createdTag,
    users: createdUsers.map(user => user.userId),
  };

  return {
    tagWithUsers,
  };
};

export const retrieveAll = async (): Promise<schema.UserTag[]> => {
  const findTemplates = await prisma.tag.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      users: true,
    },
  });

  return findTemplates.map(template => ({
    ...template,
    users: template.users.map(user => user.userId),
  }));
};

export const updateTag = async (tagUpdate: schema.UserTagUpdate) => {
  const deleteUserTag = prisma.userTag.deleteMany({
    where: {
      tagId: tagUpdate.id,
    },
  });

  const updateTag = prisma.tag.update({
    where: {
      id: tagUpdate.id,
    },
    data: {
      title: tagUpdate.title,
      description: tagUpdate.description,
      users: {
        createMany: {
          data: tagUpdate.users.map(user => ({ userId: user })),
        },
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      users: {
        select: {
          userId: true,
        },
      },
    },
  });

  const result = await prisma.$transaction([deleteUserTag, updateTag]);
  const { users, ...updatedTag } = result[1];

  const tagWithUsers: schema.UserTag = {
    ...updatedTag,
    users: users.map(user => user.userId),
  };

  return {
    tagWithUsers,
  };
};

export const deleteTag = async ({
  id,
}: schema.Delete): Promise<schema.Deleted> => {
  const deleteUserTag = prisma.userTag.deleteMany({
    where: {
      tagId: id,
    },
  });

  const deleteTag = prisma.tag.delete({
    where: { id: id },
  });

  const result = await prisma.$transaction([deleteUserTag, deleteTag]);
  const deletedTag = result[1];

  return {
    id: deletedTag.id,
  };
};
