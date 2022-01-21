import { renderBlock } from './lib.js';
import { users } from './userCollection.js';
import { getFavoritesAmount, getUserData } from "./localstor.js";
export function renderUserBlock(name, url, favoriteItemsAmount) {
    const us = users.find((user) => {
        return (user.name === name && user.url === url && user.favoriteItemsAmount === favoriteItemsAmount);
    });
    getUserData(us);
    getFavoritesAmount(us);
    const favoritesCaption = us.favoriteItemsAmount < 1 || us.favoriteItemsAmount == null ? 'ничего нет' : us.favoriteItemsAmount;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFdEMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHFCQUFxQixDQUFBO0FBQ3pDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRCxNQUFNLFVBQVUsZUFBZSxDQUFFLElBQVcsRUFBQyxHQUFVLEVBQUMsbUJBQTJCO0lBQ2xGLE1BQU0sRUFBRSxHQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFVLEVBQUMsRUFBRTtRQUNoQyxPQUFNLENBQUUsSUFBSSxDQUFDLElBQUksS0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLG1CQUFtQixLQUFHLG1CQUFtQixDQUFDLENBQUE7SUFDL0YsQ0FBQyxDQUFDLENBQUE7SUFDRCxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDZixrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN2QixNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsR0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLG1CQUFtQixJQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFBLENBQUMsQ0FBQSxFQUFFLENBQUMsbUJBQW1CLENBQUE7SUFDdEgsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO0lBQzlELFdBQVcsQ0FDVCxZQUFZLEVBQ1o7O2dDQUU0QixFQUFFLENBQUMsR0FBRzs7NEJBRVYsRUFBRSxDQUFDLElBQUk7O2tDQUVELGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxnQkFBZ0I7Ozs7S0FJdkYsQ0FDRixDQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlckJsb2NrIH0gZnJvbSAnLi9saWIuanMnXG5pbXBvcnQge1VzZXJzfSBmcm9tICcuL3VzZXJDb2xsZWN0aW9uLmpzJ1xuaW1wb3J0IHt1c2Vyc30gZnJvbSAnLi91c2VyQ29sbGVjdGlvbi5qcydcbmltcG9ydCB7Z2V0RmF2b3JpdGVzQW1vdW50LCBnZXRVc2VyRGF0YX0gZnJvbSBcIi4vbG9jYWxzdG9yLmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJVc2VyQmxvY2sgKG5hbWU6c3RyaW5nLHVybDpzdHJpbmcsZmF2b3JpdGVJdGVtc0Ftb3VudD86bnVtYmVyKSB7XG4gY29uc3QgdXM9dXNlcnMuZmluZCgodXNlcjpVc2Vycyk9PntcbiAgIHJldHVybiggdXNlci5uYW1lPT09bmFtZSAmJiB1c2VyLnVybD09PXVybCAmJiB1c2VyLmZhdm9yaXRlSXRlbXNBbW91bnQ9PT1mYXZvcml0ZUl0ZW1zQW1vdW50KVxuIH0pXG4gIGdldFVzZXJEYXRhKHVzKVxuICBnZXRGYXZvcml0ZXNBbW91bnQodXMpXG4gY29uc3QgZmF2b3JpdGVzQ2FwdGlvbiA9IHVzLmZhdm9yaXRlSXRlbXNBbW91bnQ8MSB8fCB1cy5mYXZvcml0ZUl0ZW1zQW1vdW50PT1udWxsID8gJ9C90LjRh9C10LPQviDQvdC10YInOnVzLmZhdm9yaXRlSXRlbXNBbW91bnRcbiAgY29uc3QgaGFzRmF2b3JpdGVJdGVtcyA9IHVzLmZhdm9yaXRlSXRlbXNBbW91bnQgPyB0cnVlIDogZmFsc2VcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3VzZXItYmxvY2snLFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWNvbnRhaW5lclwiPlxuICAgICAgPGltZyBjbGFzcz1cImF2YXRhclwiIHNyYz0ke3VzLnVybH0gYWx0PVwiV2FkZSBXYXJyZW5cIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cImluZm9cIj5cbiAgICAgICAgICA8cCBjbGFzcz1cIm5hbWVcIj4ke3VzLm5hbWV9PC9wPlxuICAgICAgICAgIDxwIGNsYXNzPVwiZmF2XCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImhlYXJ0LWljb24ke2hhc0Zhdm9yaXRlSXRlbXMgPyAnIGFjdGl2ZScgOiAnJ31cIj48L2k+JHtmYXZvcml0ZXNDYXB0aW9ufVxuICAgICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGBcbiAgKVxufVxuIl19