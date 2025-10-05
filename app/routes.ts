import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("teams/:teamId","team/team.tsx")
] satisfies RouteConfig;
