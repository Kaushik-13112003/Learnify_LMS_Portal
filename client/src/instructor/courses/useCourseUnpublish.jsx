import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCourseUnpublish = () => {
  const queryClient = useQueryClient();

  //update course
  const { mutate: unpublishCourse } = useMutation({
    mutationFn: async ({ id }) => {
      try {
        const res = await fetch(`/api/course/unpublish-course/${id}`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
        });

        const dataFromResponse = await res.json();

        if (res.ok) {
          toast.success(dataFromResponse?.msg);
          queryClient.invalidateQueries({ queryKey: ["instructorAllCourses"] });
        } else {
          toast.error("something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  // Submit updated data
  const handleCourseUnpublish = (id) => {
    unpublishCourse({ id });
  };

  return handleCourseUnpublish;
};

export default useCourseUnpublish;
