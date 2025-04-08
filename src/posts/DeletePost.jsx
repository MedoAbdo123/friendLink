import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function DeletePost({ onClose, postId }) {
  const [isVisible, setIsVisible] = useState(true)
  const navigate = useNavigate()
  function handleClose() {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 800)
  }

  async function deletePost() {
    const requests = await fetch(`http://localhost:3000/posts/delete/${postId}`, {
      method: "DELETE"
    })
    setTimeout(() => {
      window.location.reload();
    }, 800)
    return requests
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='flex w-full justify-center'
        >
          <div className='bg-white text-black max-w-[300px] rounded-lg mt-4 sm:min-w-[600px] h-37'>
            <h1 className='m-5 font-bold text-xl'>
              Do you really want to delete the post?
            </h1>
            <div className='flex items-end h-12 sm:h-17 justify-end'>
              <div className='space-x-2 px-4 py-2 sm:py-0'>
                <button onClick={() => { deletePost(postId), handleClose() }} className='bg-blue-600 text-white px-4 py-1 rounded-md'>
                  Yes
                </button>
                <button onClick={handleClose} className='bg-red-600 text-white px-4 py-1 rounded-md'>
                  No
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DeletePost
