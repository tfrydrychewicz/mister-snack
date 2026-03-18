# Mister Snack

Mister Snack is a nutrition assitant, that plans users daily meals, based on what it knows about the user.

# Tech Stack

- Electron
- Vite + Vue
- Tailwind CSS
- Storybook

# Engineering considerations

- the app should be tested
- all ui components should be dumb, reusable components, and all odf them should be registered in the Storybook (add a relevant cursor rule for all Vue files, to make sure that we use storybook)
- the app should be extensible - we will add more features in the future

# New features

- every new features should be first designed in a detailed MD file in @features/ folder.
- abstraction and reusability shouyld always a key concern
  \*\* Add a relevant "alwaysApply" cursor rule, stating that all new features should first be descrivbed, before they get implemented, and stating the importance of reusability.

# User Journeys/Scenarios

- On first run, the app should get to know the user, so taht it can plan the meals effectively and profesionally
  ** nutritionh preferences
  ** diets
  ** alergies
  ** goals
- The user can send a photo of a meal from the daily plan - the app should attach it to the proper meal, analyse it and summarize.
- The app sohould plan the meals for a selected period of time
- The app should allow changes to the plan (e.g. replacing one meal or even one ingredient)
