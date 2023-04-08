import { APIRoute } from "next-s3-upload";
export default APIRoute.configure({
    key(req, filename) {
        const uid = req.body.uid;
        if (!uid) return `useruploads/default/${filename}`;
        return `useruploads/${uid}/${filename}`;
    }
});