import { connect } from "react-redux";
import { RootState } from "../../store";
import {
  NumPage,
  ButtonPage,
  ItemPaginate,
  MenuPaginate,
} from "./Pagination.styles";

function Pagination({ paginate, page, totalPages }: any & { totalPages: number }) {
  const pageNumbers = [];

  for(let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <MenuPaginate>
          <ButtonPage onClick={() => paginate(page - 1)} disabled={page === 0} > &laquo; </ButtonPage>
      {pageNumbers.map((number) => (
        <ItemPaginate key={number} backColor={page === number - 1 ? '#ffc107' : '#ddd'} >
          <NumPage onClick={() => paginate(number - 1)}>
            {number}
          </NumPage>
        </ItemPaginate>
        ))}
          <ButtonPage onClick={() => paginate(page + 1)} disabled={page + 1 === totalPages} > &raquo; </ButtonPage>
      </MenuPaginate>
    </nav>
  )
}

const mapStateToProps = (state: RootState) => ({
  totalPages: state.fundraiserReducer.totalPages
 })

export default connect(mapStateToProps)(Pagination);