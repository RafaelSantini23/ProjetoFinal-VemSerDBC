
function Pagination({ pagination }: { pagination: number[] }) {

  return (
    <div>
      {
        pagination && 
        pagination.map((item) => (
          <div>
              <h3> Item #{item} </h3>
          </div>
        ))
      }
    </div>
  )
}


export default Pagination;