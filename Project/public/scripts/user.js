import { renderBlock } from './lib.js';
export function renderUserBlock(name, url, favoriteItemsAmount) {
    const favoritesCaption = favoriteItemsAmount < 1 ? 'ничего нет' : favoriteItemsAmount;
    const hasFavoriteItems = favoriteItemsAmount ? true : false;
    renderBlock('user-block', `
    <div class="header-container">
      <img class="avatar" src=${url} alt="Wade Warren" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFdEMsTUFBTSxVQUFVLGVBQWUsQ0FBRSxJQUFXLEVBQUMsR0FBVSxFQUFDLG1CQUEwQjtJQUNqRixNQUFNLGdCQUFnQixHQUFHLG1CQUFtQixHQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsWUFBWSxDQUFBLENBQUMsQ0FBQSxtQkFBbUIsQ0FBQTtJQUMvRSxNQUFNLGdCQUFnQixHQUFHLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtJQUMzRCxXQUFXLENBQ1QsWUFBWSxFQUNaOztnQ0FFNEIsR0FBRzs7NEJBRVAsSUFBSTs7a0NBRUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLGdCQUFnQjs7OztLQUl2RixDQUNGLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyQmxvY2sgfSBmcm9tICcuL2xpYi5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclVzZXJCbG9jayAobmFtZTpzdHJpbmcsdXJsOnN0cmluZyxmYXZvcml0ZUl0ZW1zQW1vdW50Om51bWJlcil7XG4gY29uc3QgZmF2b3JpdGVzQ2FwdGlvbiA9IGZhdm9yaXRlSXRlbXNBbW91bnQ8MT8gJ9C90LjRh9C10LPQviDQvdC10YInOmZhdm9yaXRlSXRlbXNBbW91bnRcbiAgY29uc3QgaGFzRmF2b3JpdGVJdGVtcyA9IGZhdm9yaXRlSXRlbXNBbW91bnQgPyB0cnVlIDogZmFsc2VcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3VzZXItYmxvY2snLFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWNvbnRhaW5lclwiPlxuICAgICAgPGltZyBjbGFzcz1cImF2YXRhclwiIHNyYz0ke3VybH0gYWx0PVwiV2FkZSBXYXJyZW5cIiAvPlxuICAgICAgPGRpdiBjbGFzcz1cImluZm9cIj5cbiAgICAgICAgICA8cCBjbGFzcz1cIm5hbWVcIj4ke25hbWV9PC9wPlxuICAgICAgICAgIDxwIGNsYXNzPVwiZmF2XCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImhlYXJ0LWljb24ke2hhc0Zhdm9yaXRlSXRlbXMgPyAnIGFjdGl2ZScgOiAnJ31cIj48L2k+JHtmYXZvcml0ZXNDYXB0aW9ufVxuICAgICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGBcbiAgKVxufVxuIl19