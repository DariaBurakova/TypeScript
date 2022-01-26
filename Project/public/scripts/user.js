import { renderBlock } from './lib.js';
import { users } from './userCollection.js';
export function renderUserBlock(name, url, favoriteItemsAmount) {
    const us = users.find((user) => {
        return (user.name === name && user.url === url && user.favoriteItemsAmount === favoriteItemsAmount);
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFdEMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHFCQUFxQixDQUFBO0FBRXpDLE1BQU0sVUFBVSxlQUFlLENBQUUsSUFBVyxFQUFDLEdBQVUsRUFBQyxtQkFBMkI7SUFDbEYsTUFBTSxFQUFFLEdBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQVUsRUFBQyxFQUFFO1FBQ2hDLE9BQU0sQ0FBRSxJQUFJLENBQUMsSUFBSSxLQUFHLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEtBQUcsbUJBQW1CLENBQUMsQ0FBQTtJQUMvRixDQUFDLENBQUMsQ0FBQTtJQUNGLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixHQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsbUJBQW1CLElBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUEsQ0FBQyxDQUFBLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQTtJQUN0SCxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7SUFDOUQsV0FBVyxDQUNULFlBQVksRUFDWjs7Z0NBRTRCLEVBQUUsQ0FBQyxHQUFHOzs0QkFFVixFQUFFLENBQUMsSUFBSTs7a0NBRUQsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLGdCQUFnQjs7OztLQUl2RixDQUNGLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyQmxvY2sgfSBmcm9tICcuL2xpYi5qcydcbmltcG9ydCB7VXNlcnN9IGZyb20gJy4vdXNlckNvbGxlY3Rpb24uanMnXG5pbXBvcnQge3VzZXJzfSBmcm9tICcuL3VzZXJDb2xsZWN0aW9uLmpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyVXNlckJsb2NrIChuYW1lOnN0cmluZyx1cmw6c3RyaW5nLGZhdm9yaXRlSXRlbXNBbW91bnQ/Om51bWJlcikge1xuIGNvbnN0IHVzPXVzZXJzLmZpbmQoKHVzZXI6VXNlcnMpPT57XG4gICByZXR1cm4oIHVzZXIubmFtZT09PW5hbWUgJiYgdXNlci51cmw9PT11cmwgJiYgdXNlci5mYXZvcml0ZUl0ZW1zQW1vdW50PT09ZmF2b3JpdGVJdGVtc0Ftb3VudClcbiB9KSBcbiBjb25zdCBmYXZvcml0ZXNDYXB0aW9uID0gdXMuZmF2b3JpdGVJdGVtc0Ftb3VudDwxIHx8IHVzLmZhdm9yaXRlSXRlbXNBbW91bnQ9PW51bGwgPyAn0L3QuNGH0LXQs9C+INC90LXRgic6dXMuZmF2b3JpdGVJdGVtc0Ftb3VudFxuICBjb25zdCBoYXNGYXZvcml0ZUl0ZW1zID0gdXMuZmF2b3JpdGVJdGVtc0Ftb3VudCA/IHRydWUgOiBmYWxzZVxuICByZW5kZXJCbG9jayhcbiAgICAndXNlci1ibG9jaycsXG4gICAgYFxuICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItY29udGFpbmVyXCI+XG4gICAgICA8aW1nIGNsYXNzPVwiYXZhdGFyXCIgc3JjPSR7dXMudXJsfSBhbHQ9XCJXYWRlIFdhcnJlblwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mb1wiPlxuICAgICAgICAgIDxwIGNsYXNzPVwibmFtZVwiPiR7dXMubmFtZX08L3A+XG4gICAgICAgICAgPHAgY2xhc3M9XCJmYXZcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiaGVhcnQtaWNvbiR7aGFzRmF2b3JpdGVJdGVtcyA/ICcgYWN0aXZlJyA6ICcnfVwiPjwvaT4ke2Zhdm9yaXRlc0NhcHRpb259XG4gICAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYFxuICApXG59XG4iXX0=