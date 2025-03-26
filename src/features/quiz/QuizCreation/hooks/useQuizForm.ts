import { useForm, useFieldArray } from "react-hook-form";
import { UpdateQuizInput } from "../../types/quiz";

export const useQuizForm = () => {
  const form = useForm<UpdateQuizInput>({
    defaultValues: {
      title: "",
      description: "",
      questions: [
        {
          question: "",
          optionType: "TEXT",
          options: [
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
          ],
        },
      ],
    },
  });

  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  return {
    form,
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
    fields,
    append,
    remove,
  };
};
