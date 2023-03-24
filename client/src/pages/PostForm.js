import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePosts } from "../context/postContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function PostForm() {
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  // Devuelve el req.params
  const params = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    (async () => {
      if (params.id) {
        const res = await getPost(params.id);
        setPost(res);
      }
    })();
  }, [getPost, params.id]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header
          className="flex justify-between items-center
      py-4 text-white"
        >
          <h3 className="text-xl">New Post!</h3>
          <Link to="/" className="text-gray-400 text-dm hover:text-gray-300 ">
            Go Back
          </Link>
        </header>

        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is Required"),
            description: Yup.string().required("Description is Required"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }

            actions.setSubmitting(false);
            navigate("/");
          }}
          // Sirve para que reinicie los valores cuando
          // se cambian en el initialValues
          enableReinitialize={true}
        >
          {/* isSubmitting lo vamos a utilizar para no poder enviar el 
          form muchas veces seguidas */}
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block fornt-bold
          text-gray-400 "
              >
                Title
              </label>

              <Field
                name="title"
                placeholder="title"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="title"
              />
              <label
                htmlFor="description"
                className="text-sm block fornt-bold
          text-gray-400 "
              >
                Description
              </label>
              <Field
                component="textarea"
                name="description"
                placeholder="description"
                rows={3}
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="description"
              />

              <label
                htmlFor="image"
                className="text-sm block fornt-bold
          text-gray-400 "
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600
            text-white w-full"
                // setFieldValue sirve para que Formik pueda
                // establecer el valor del campo file (el cual de forma predeterminada no establece).
                // Por lo que nosotros necesitamos establecerlo a partir de e.target.files
                onChange={(e) => setFieldValue("image", e.target.files[0])}
              />

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                ) : (
                  "save"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
