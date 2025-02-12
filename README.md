# Masonry Grid Image Gallery

A responsive image gallery built with React, TypeScript, and styled-components, featuring infinite scroll and optimized image loading.

## Design Decisions

### Architecture and Component Structure

1. **Component Organization**

   - Components are organized by feature and shared functionality
   - Shared components are placed in a `shared` directory for reusability
   - Styles are co-located with their components for better maintainability

2. **Performance Optimizations**

   - Lazy loading images using `IntersectionObserver`
   - Eager loading for above-fold content
   - Memoization of components and expensive calculations
   - Image optimization with different sizes based on viewport

3. **State Management**

   - Context API for global loading and error states
   - Local state for component-specific data
   - Custom hooks for reusable logic and data fetching

4. **Loading States**

   - Initial page load shows a full-screen loading indicator
   - Infinite scroll shows a minimal loading indicator at the bottom

5. **Error Handling**

   - Centralized error handling through LoadingContext
   - User-friendly error messages with toast notifications
   - Graceful fallbacks for failed image loads

6. **Styling Approach**

   - Styled-components for component-scoped CSS
   - Responsive design with mobile-first approach
   - Consistent styling through shared variables and themes

7. **Code Quality**

   - TypeScript for type safety
   - Memoization to prevent unnecessary re-renders
   - Consistent file and folder structure
   - Separation of concerns between components

8. **User Experience**

   - Smooth transitions between loading states
   - Responsive grid layout adapting to screen size
   - Optimized image loading based on viewport
   - Clear loading and error feedback

9. **Testing and Maintainability**
   - Components designed for testability
   - Props interfaces clearly defined
   - Consistent naming conventions
   - Modular code structure for easy updates

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn run analyze`

Analyzes the bundle size using source-map-explorer.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
