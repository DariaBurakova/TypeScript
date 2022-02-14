import { renderBlock } from './lib.js';
import { users } from './userCollection.js';
export function renderUserBlock(name, url, favoriteItemsAmount) {
    const us = users.find((user) => {
        return (user.name === name && user.url === url && user.favoriteItemsAmount === favoriteItemsAmount);
    });
    const favoritesCaption = us.favoriteItemsAmount == null ? 'ничего нет' : us.favoriteItemsAmount;
    const hasFavoriteItems = us.favoriteItemsAmount ? true : false;
    renderBlock('user-block', `
    <div class="header-container">
      <img class="avatar" src=${us.url} alt="Wade Warren" />
      <div class="info">
          <p class="name">${us.name}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFdEMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHFCQUFxQixDQUFBO0FBUXpDLE1BQU0sVUFBVSxlQUFlLENBQUUsSUFBVyxFQUFDLEdBQVUsRUFBQyxtQkFBMkI7SUFDbEYsTUFBTSxFQUFFLEdBQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQVUsRUFBQyxFQUFFO1FBQ3RDLE9BQU0sQ0FBRSxJQUFJLENBQUMsSUFBSSxLQUFHLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEtBQUcsbUJBQW1CLENBQUMsQ0FBQTtJQUMvRixDQUFDLENBQUMsQ0FBQTtJQUNGLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixJQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFBLENBQUMsQ0FBQSxFQUFFLENBQUMsbUJBQW1CLENBQUE7SUFDMUYsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO0lBQzlELFdBQVcsQ0FDVCxZQUFZLEVBQ1o7O2dDQUU0QixFQUFFLENBQUMsR0FBRzs7NEJBRVYsRUFBRSxDQUFDLElBQUk7O2tDQUVELGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxnQkFBZ0I7Ozs7S0FJdkYsQ0FDRixDQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlckJsb2NrIH0gZnJvbSAnLi9saWIuanMnXG5pbXBvcnQge1VzZXJzfSBmcm9tICcuL3VzZXJDb2xsZWN0aW9uLmpzJ1xuaW1wb3J0IHt1c2Vyc30gZnJvbSAnLi91c2VyQ29sbGVjdGlvbi5qcydcblxuXG5cblxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclVzZXJCbG9jayAobmFtZTpzdHJpbmcsdXJsOnN0cmluZyxmYXZvcml0ZUl0ZW1zQW1vdW50PzpudW1iZXIpe1xuIGNvbnN0IHVzOlVzZXJzPXVzZXJzLmZpbmQoKHVzZXI6VXNlcnMpPT57XG4gICByZXR1cm4oIHVzZXIubmFtZT09PW5hbWUgJiYgdXNlci51cmw9PT11cmwgJiYgdXNlci5mYXZvcml0ZUl0ZW1zQW1vdW50PT09ZmF2b3JpdGVJdGVtc0Ftb3VudClcbiB9KSBcbiBjb25zdCBmYXZvcml0ZXNDYXB0aW9uID0gdXMuZmF2b3JpdGVJdGVtc0Ftb3VudD09bnVsbCA/ICfQvdC40YfQtdCz0L4g0L3QtdGCJzp1cy5mYXZvcml0ZUl0ZW1zQW1vdW50XG4gIGNvbnN0IGhhc0Zhdm9yaXRlSXRlbXMgPSB1cy5mYXZvcml0ZUl0ZW1zQW1vdW50ID8gdHJ1ZSA6IGZhbHNlXG4gIHJlbmRlckJsb2NrKFxuICAgICd1c2VyLWJsb2NrJyxcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cImhlYWRlci1jb250YWluZXJcIj5cbiAgICAgIDxpbWcgY2xhc3M9XCJhdmF0YXJcIiBzcmM9JHt1cy51cmx9IGFsdD1cIldhZGUgV2FycmVuXCIgLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvXCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJuYW1lXCI+JHt1cy5uYW1lfTwvcD5cbiAgICAgICAgICA8cCBjbGFzcz1cImZhdlwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJoZWFydC1pY29uJHtoYXNGYXZvcml0ZUl0ZW1zID8gJyBhY3RpdmUnIDogJyd9XCI+PC9pPiR7ZmF2b3JpdGVzQ2FwdGlvbn1cbiAgICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgXG4gIClcbn1cbiJdfQ==