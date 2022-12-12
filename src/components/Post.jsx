import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
  const { post_id } = useParams();
  const [message, setMessage] = useState(null);
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    comment: "",
  });

  const displayMessage = (data) => {
    if (data.message) {
      return (
        <div className="mx-auto bg-green-100 px-10 py-2 w-fit rounded-lg">
          {data.message}
        </div>
      );
    }
    if (data.errors) {
      const errors = data.errors.map((error) => {
        return (
          <div className="mx-auto bg-red-100 px-10 py-2 w-fit rounded-lg">
            {error.msg}
          </div>
        );
      });
      return errors;
    }
    if (data.error) {
      return (
        <div className="mx-auto bg-red-100 px-10 py-2 w-fit rounded-lg">
          {data.message}
        </div>
      );
    }
  };

  const displayComments = (data) => {
    const comments = data.map((comment) => {
      return (
        <div
          key={comment._id}
          className="bg-slate-50 ring-1 ring-rose-200 mb-2 rounded-lg p-3"
        >
          <div className="border-b-[1px] border-b-rose-300 inline-block font-bold">
            {comment.fullname}
          </div>
          <div className="py-2">{comment.comment}</div>
          <div className="text-right text-sm">
            {comment.timestamp_formatted}
          </div>
        </div>
      );
    });
    return comments;
  };

  useEffect(() => {
    axios
      .get(
        `http://blog-api-top-server-production.up.railway.app:3001//api/posts/${post_id}`
      )
      .then((res) => {
        setData(res.data);
        setComments(res.data.post.comments.reverse());
      });
  }, []);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://blog-api-top-server-production.up.railway.app:3001//api/posts/${post_id}/new_comment`,
        form
      )
      .then((res) => {
        setMessage(res.data);
        setComments((prev) => [res.data.newComment, ...prev]);
      });
    const inputs = [...e.target];
    inputs.map((input) => (input.value = null));
  };
  return (
    <div>
      {data.post && (
        <div>
          <div className="h-96">
            <img
              className="h-full w-full object-cover rounded-lg shadow-lg"
              src={`http://blog-api-top-server-production.up.railway.app:3001//${data.post.imageURL}`}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <div className="text-center font-bold text-xl">
              {data.post.title}
            </div>
            <div className="flex justify-around">
              <div>{data.post.author.fullname}</div>
              <div>{data.post.timestamp_formatted}</div>
            </div>
            <div>{data.post.postDetail}</div>
          </div>
          <div className="text-center font-bold text-xl my-3">Send comment</div>
          {message && displayMessage(message)}
          <form
            action={`http://blog-api-top-server-production.up.railway.app:3001//api/posts/${data.post._id}/new_comment`}
            method="POST"
            className="min-w-fit lg:min-w-fit w-1/2 mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-row gap-x-5 flex-wrap lg:flex-nowrap">
              <div className="w-full flex flex-col">
                <label className="p-1" htmlFor="firstname" />
                <input
                  className="p-2 rounded-md bg-slate-100 focus:outline-none focus:ring-blue-500 focus:ring-1 transition hover:shadow-[0px_0px_3px_rgba(0,8,255,0.4)]"
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className="w-full flex flex-col">
                <label className="p-1" htmlFor="lastname" />
                <input
                  className="p-2 rounded-md bg-slate-100 focus:outline-none focus:ring-blue-500 focus:ring-1 transition hover:shadow-[0px_0px_3px_rgba(0,8,255,0.4)]"
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  onChange={handleChangeForm}
                  required
                />
              </div>
            </div>
            <div className="w-full flex flex-col">
              <label className="p-1" htmlFor="email" />
              <input
                className="p-2 rounded-md bg-slate-100 focus:outline-none focus:ring-blue-500 focus:ring-1 transition hover:shadow-[0px_0px_3px_rgba(0,8,255,0.4)]"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleChangeForm}
                required
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="p-1" htmlFor="comment" />
              <textarea
                placeholder="Write a comment"
                className="p-2 rounded-md bg-slate-100 focus:outline-none focus:ring-blue-500 focus:ring-1 transition hover:shadow-[0px_0px_3px_rgba(0,8,255,0.4)]"
                id="comment"
                name="comment"
                onChange={handleChangeForm}
                required
              ></textarea>
            </div>
            <input
              type="submit"
              className="py-2 px-10 bg-rose-100 text-lg rounded-lg mt-8 hover:bg-rose-400 transition scale-[1.02] block mx-auto"
            />
          </form>
          <div className="text-center text-xl font-bold my-5">Comments</div>
          {comments.length === 0 ? (
            <h1 className="bg-blue-100 px-8 py-3 rounded-lg w-fit mx-auto my-5">
              There is no comments
            </h1>
          ) : null}

          {comments && displayComments(comments)}
        </div>
      )}
    </div>
  );
};

export default Post;
