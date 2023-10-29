import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addCommentApi, getStoryApi } from "../../api/story";
import { useForm, Controller } from "react-hook-form";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const FullStory = () => {
  const { id } = useParams();
  const [storyData, setStoryData] = useState();
  const [isAddComment, setIsAddComment] = useState(false);

  const getStoryById = async (postId) => {
    const storyData = await getStoryApi(postId);
    setStoryData(storyData.data[0]);
  };

  useEffect(() => {
    getStoryById(id);
  }, [id]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (comment) => {
    const commentData = await addCommentApi(comment, id);
    getStoryById(id);
    const commentInput = document.getElementById("comment");
    if (commentInput) {
      commentInput.value = "";
    }
    setIsAddComment(false);
  };

  return (
    <>
      <div className="flex justify-center mt-5 ml-5 bg-gray-100">
        <div className="bg-white w-full h-full max-w-screen-xl p-4 shadow-lg rounded-lg">
          {storyData ? (
            <>
              <h1 className="text-3xl font-bold mb-4">{storyData.title}</h1>
              <p className="text-gray-700">{storyData.story}</p>
            </>
          ) : null}
          <br></br>
          <div className="flex items-center mb-2">
            <FontAwesomeIcon icon={faEye} className="text-gray-500 mr-2" />
            <span className="text-gray-500">{storyData?.views + ' '}views</span>
          </div>
          <div className="flex">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded text-sm mr-2"
              onClick={() => {
                setIsAddComment(true);
              }}
            >
              Add Comment
            </button>
          
          </div>
          <br></br>
          {isAddComment ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="comment"
                control={control}
                defaultValue=""
                rules={{ required: "Comment is required" }}
                render={({ field }) => (
                  <textarea
                    className="w-full md:w-2/5 mt-2 p-2 border rounded"
                    placeholder="Write your comment..."
                    {...field}
                  />
                )}
              />
              <span className="text-red-500 text-xs">
                {errors.comment && errors.comment.message}
              </span>
              <div className="mt-2">
                <button className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded text-xs">
                  Submit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 border border-red-700 rounded ml-2 text-xs"
                  onClick={() => {
                    setIsAddComment(false);
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          ) : null}
          <h6 className="font-bold mt-4">Comments:</h6>
          {storyData &&
            storyData?.comments?.map((item, index) => {
              return (
                <div className="bg-gray-200 p-2 my-2 rounded w-full md:w-1/2" key={index}>
                  <p className="text-dark">{item.comment}</p>
                  <figcaption className="blockquote-footer text-gray-500">
                    {moment(item.created_at).format("DD-MM-YYYY [at] h:mm A")}
                  </figcaption>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default FullStory;
