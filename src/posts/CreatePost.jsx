import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState(null)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  async function handleImageChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setImage(file)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData()

    formData.append("title", title)
    formData.append("body", body)
    formData.append("image", image)

    try {
      const request = await fetch("http://localhost:3000/posts/createPost", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      })
      navigate("/")
      return request
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div onSubmit={handleSubmit} className='bg-white min-h-screen flex items-center p-4'>
      <form className="w-full sm:w-[80%] mx-auto p-6 bg-white rounded-lg shadow border border-gray-400">
        <div className="mb-6">
          <label className="block text-black text-lg text-start font-bold mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 text-black rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9e9595]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-black text-lg text-start font-bold mb-2">Content</label>
          <textarea
            placeholder="Write your post content here…"
            rows="6"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full text-black p-3 rounded border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-[#9e9595]"
          />
        </div>

        <div className='mb-4 flex'>
          {preview ?
            <label className='w-[100%] bg-[#aa9f9fc0] flex rounded-lg border-black'>
              <img src={preview} className='w-[999999%] rounded-lg max-h-120 object-contain '/>
              <input type="file" hidden onChange={handleImageChange} />
              <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" height="198px" width="198px" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M250-160q-86 0-148-62T40-370q0-78 49.5-137.5T217-579q20-97 94-158.5T482-799q113 0 189.5 81.5T748-522v24q72-2 122 46.5T920-329q0 69-50 119t-119 50H510q-24 0-42-18t-18-42v-258l-83 83-43-43 156-156 156 156-43 43-83-83v258h241q45 0 77-32t32-77q0-45-32-77t-77-32h-63v-84q0-89-60.5-153T478-739q-89 0-150 64t-61 153h-19q-62 0-105 43.5T100-371q0 62 43.93 106.5T250-220h140v60H250Zm230-290Z" /></svg>            <input type="file" hidden className='bg-red-600' />
            </label>
            :
            <label className='w-[100%] bg-[#aa9f9fc0] border-dashed rounded-lg border-black border-3'>
              <img src={preview} className='w-[999999%] ' />
              <input type="file" hidden onChange={handleImageChange} />
              <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" height="198px" width="198px" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M250-160q-86 0-148-62T40-370q0-78 49.5-137.5T217-579q20-97 94-158.5T482-799q113 0 189.5 81.5T748-522v24q72-2 122 46.5T920-329q0 69-50 119t-119 50H510q-24 0-42-18t-18-42v-258l-83 83-43-43 156-156 156 156-43 43-83-83v258h241q45 0 77-32t32-77q0-45-32-77t-77-32h-63v-84q0-89-60.5-153T478-739q-89 0-150 64t-61 153h-19q-62 0-105 43.5T100-371q0 62 43.93 106.5T250-220h140v60H250Zm230-290Z" /></svg>            <input type="file" hidden className='bg-red-600' />
            </label>
          }
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Save Post
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="border border-black text-black px-6 py-2 rounded transition-all hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  )
}

export default CreatePost
