import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useBookmark = () => {
  const queryClient = useQueryClient();

  // bookmark course
  const { mutate: bookmarkCourse } = useMutation({
    mutationFn: async ({ id }) => {
      try {
        let res = await fetch(`/api/user/bookmark-course/${id}`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
        });

        let dataFromResponse = await res.json();
        if (res.ok) {
          toast.success(dataFromResponse?.msg);
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          queryClient.invalidateQueries({ queryKey: ["allBookmarks"] });
        } else {
          toast.error(dataFromResponse?.msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleBookmark = async (id) => {
    bookmarkCourse({ id });
  };

  return handleBookmark;
};

export default useBookmark;
