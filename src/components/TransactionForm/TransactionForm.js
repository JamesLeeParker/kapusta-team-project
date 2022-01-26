import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import Calendar from 'components/Calendar';
import s from './TransactionForm.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIncomeCategories,
  getExpenseCategories,
} from 'redux/transaction/selectors';
import { addIncome, addExpense, changeDate } from 'redux/transaction';

function TransactionForm({ transactionsType }) {
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const formTitleData = {
    descriptionTitle: '',
    categoryTitle: '',
    categoriesList: [],
  };

  const incomeCategories = useSelector(getIncomeCategories) || [];
  const expenseCategories = useSelector(getExpenseCategories) || [];

  if (transactionsType === 'incomes') {
    formTitleData.descriptionTitle = 'Описание дохода';
    formTitleData.categoryTitle = 'Категория дохода';
    formTitleData.categoriesList = incomeCategories;
  } else {
    formTitleData.descriptionTitle = 'Описание товара';
    formTitleData.categoryTitle = 'Категория товара';
    formTitleData.categoriesList = expenseCategories;
  }

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'product':
        return setDescription(value);

      case 'price':
        return setAmount(Number(value));

      default:
        throw new Error(`there is no such name as ${name}`);
    }
  };

  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };

  const dateHandle = date => {
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    setDate(`${year}-${month}-${day}`);
    dispatch(changeDate(`${year}-${month}-${day}`));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const transaction = { date, description, category, amount };
    transactionsType === 'incomes'
      ? dispatch(addIncome(transaction))
      : dispatch(addExpense(transaction));
    handleBtnClear();
  };

  const handleBtnClear = () => {
    setDescription('');
    setAmount('');
    setCategory('');
  };

  return (
    <div className={s.tabletFormPosition}>
      <form className={s.form} onSubmit={handleSubmit} autoComplete="off">
        <div className={s.dataInput}>
          <Calendar dateHandle={dateHandle} />
          <TextField
            id="outline-basic"
            label={formTitleData.descriptionTitle}
            color="warning"
            type="text"
            name="product"
            value={description}
            inputProps={{ minLength: 3, maxLength: 20 }}
            className={s.inputDescription}
            onChange={handleInputChange}
            required={true}
          />

          <Box sx={{ minWidth: 120 }} className={s.box}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                color="warning"
                className={s.inputCategory}
              >
                {formTitleData.categoryTitle}
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                required={true}
                value={category}
                onChange={handleCategoryChange}
              >
                {formTitleData.categoriesList.map(category => (
                  <MenuItem value={category} key={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <div className={s.inputWrapper}>
            <TextField
              id="outlined-basic"
              label="0.00"
              color="warning"
              type="number"
              name="price"
              value={amount}
              required={true}
              onChange={handleInputChange}
              className={s.inputAmount}
            />
          </div>
        </div>

        <div className={s.btnWrapper}>
          <button type="submit" className={s.btn}>
            Ввод
          </button>
          <button type="button" className={s.btn} onClick={handleBtnClear}>
            Очистить
          </button>
        </div>
      </form>
    </div>
  );
}

TransactionForm.propTypes = {
  transactionsType: PropTypes.string,
};

export default TransactionForm;
