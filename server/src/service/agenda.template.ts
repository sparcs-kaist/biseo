import type { Prisma } from "@prisma/client";
import type * as schema from "@biseo/interface/agenda/template";
import { prisma } from "@/db/prisma";

export const createTemplate = async ({
  templateName,
  title,
  content,
  resolution,
  choices,
}: schema.AgendaTemplateCreate) => {
  const createTemplateQuery: Prisma.TemplateCreateInput = {
    templateName,
    title,
    content,
    resolution,
    choices: {
      create: choices.map(choice => ({ name: choice })),
    },
  };

  const { choices: createdChoices, ...createdTemplate } =
    await prisma.template.create({
      data: createTemplateQuery,
      select: {
        id: true,
        templateName: true,
        title: true,
        content: true,
        resolution: true,
        choices: {
          select: {
            name: true,
          },
        },
      },
    });

  const templateWithChoices: schema.AgendaTemplate = {
    ...createdTemplate,
    choices: createdChoices.map(choice => choice.name),
  };

  return { templateWithChoices };
};

export const retrieveAll = async (): Promise<schema.AgendaTemplate[]> => {
  const findTemplates = await prisma.template.findMany({
    select: {
      id: true,
      templateName: true,
      title: true,
      content: true,
      resolution: true,
      choices: true,
    },
  });

  return findTemplates.map(template => ({
    ...template,
    choices: template.choices.map(choice => choice.name),
  }));
};

export const updateTemplate = async (
  templateUpdate: schema.AgendaTemplateUpdate,
) => {
  const deleteChoices = prisma.templateChoice.deleteMany({
    where: {
      templateId: templateUpdate.id,
    },
  });

  const updateTemplateQuery = prisma.template.update({
    where: {
      id: templateUpdate.id,
    },
    data: {
      templateName: templateUpdate.templateName,
      title: templateUpdate.title,
      content: templateUpdate.content,
      resolution: templateUpdate.resolution,
      choices: {
        create: templateUpdate.choices.map(choice => ({ name: choice })),
      },
    },
    select: {
      id: true,
      templateName: true,
      title: true,
      content: true,
      resolution: true,
      choices: {
        select: {
          name: true,
        },
      },
    },
  });

  const result = await prisma.$transaction([
    deleteChoices,
    updateTemplateQuery,
  ]);
  const { choices: updatedChoices, ...updatedTemplate } = result[1];

  const templateWithChoices: schema.AgendaTemplate = {
    ...updatedTemplate,
    choices: updatedChoices.map(choice => choice.name),
  };

  return { templateWithChoices };
};

export const deleteTemplate = async ({
  id,
}: schema.Delete): Promise<schema.Deleted> => {
  const deleteChoicesQuery = prisma.templateChoice.deleteMany({
    where: {
      templateId: id,
    },
  });

  const deleteTemplateQuery = prisma.template.delete({
    where: { id },
  });

  const result = await prisma.$transaction([
    deleteChoicesQuery,
    deleteTemplateQuery,
  ]);
  const deletedTemplate = result[1];

  return {
    id: deletedTemplate.id,
  };
};
