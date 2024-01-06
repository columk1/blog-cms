import { useState } from 'react'
import he from 'he'
import Markdown from '../../components/Markdown/Markdown'
import { PropTypes } from 'prop-types'

const MarkdownEditor = ({ markdownStr, onChange }) => {
  const markdown = markdownStr
  const [isPreview, setIsPreview] = useState(false)
  return (
    <label className='flex flex-col gap-1'>
      <div className='flex justify-between items-end'>
        <div>
          <span className='font-bold'>Markdown</span>
          <span className='text-red-500'>*</span>
        </div>
        <button
          type='button'
          onClick={() => setIsPreview(!isPreview)}
          className='w-20 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          {isPreview ? 'Edit' : 'Preview'}
        </button>
      </div>
      {isPreview ? (
        <div className='prose prose-lg prose-a:text-blue-600 prose-a:no-underline prose-pre:bg-[#1e1e1e]'>
          <Markdown markdownString={markdown} />
        </div>
      ) : (
        <textarea
          name='markdown'
          rows={20}
          onChange={onChange}
          className='rounded-lg flex-1 appearance-none leading-7 border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent'
          value={markdown && he.decode(markdown)}
          required
        ></textarea>
      )}
    </label>
  )
}

MarkdownEditor.propTypes = {
  markdownStr: PropTypes.string,
  onChange: PropTypes.function,
}

export default MarkdownEditor
