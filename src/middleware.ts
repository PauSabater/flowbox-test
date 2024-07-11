export function onRequest (context: { locals: { title: string; }; }, next: () => any) {
    // intercept data from a request
    // optionally, modify the properties in `locals`
    context.locals.title = "New title";

    // return a Response or the result of calling `next()`
    return next();
}