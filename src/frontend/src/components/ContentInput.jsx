export default function ContentInput() {

  return (
    <div className="flex items-start space-x-4 mb-4">
      <form action="#" className="relative">
        <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-[#00501E] focus-within:ring-2 focus-within:ring-[#00501E] w-80">
          <label htmlFor="comment" className="sr-only">
            Add your comment
          </label>
          <textarea
            rows={3}
            name="comment"
            id="comment"
            className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Add your comment..."
            defaultValue={''}
          />

          {/* Spacer element to match the height of the toolbar */}
          <div className="py-2" aria-hidden="true">
            {/* Matches height of button in toolbar (1px border + 36px content height) */}
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>


      </form>
    </div>
  )
}
