import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useLikeUnlike = () => {
  const queryClient = useQueryClient();

  // bookmark course
  const { mutate: likeUnlikeCourse } = useMutation({
    mutationFn: async ({ id }) => {
      try {
        let res = await fetch(`/api/course/like/${id}`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
        });

        let dataFromResponse = await res.json();
        if (res.ok) {
          //   toast.success(dataFromResponse?.msg);
          queryClient.invalidateQueries({ queryKey: ["singleCourse"] });
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          queryClient.invalidateQueries({ queryKey: ["allCourses"] });
          queryClient.invalidateQueries({ queryKey: ["allLikedCourses"] });
        } else {
          toast.error(dataFromResponse?.msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleLikeUnlikeCourse = async (id) => {
    likeUnlikeCourse({ id });
  };

  return handleLikeUnlikeCourse;
};

export default useLikeUnlike;
