import fs from "fs";
import { creatingPost, getAllPosts, updatingPost } from "../modules/postModel.js";
import geminiDescriptionGenerator from "../services/geminiService.js";

export async function listPosts(req, res) {
    const result = await getAllPosts();
    res.status(200).json(result);
};

export async function createPost(req, res) {
    const newPost = req.body;
    console.log("Result newPost==>", newPost);
    try {
        const postCreated = await creatingPost(newPost);
        res.status(200).json(postCreated);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "Falha na requisição" });
    };
};

export async function uploadImage(req, res) {
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: "",
    }
    try {
        const postCreated = await creatingPost(newPost);
        const imageUpdate = `uploads/${postCreated.insertedId}.png`;
        fs.renameSync(req.file.path, imageUpdate);
        res.status(200).json(postCreated);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "Falha na requisição" });
    };
};

export async function updateNewPost(req, res) {
    const id = req.params.id;
    const imgUrl = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const description = await geminiDescriptionGenerator(imgBuffer);
        
        const postUpdated = {
            descricao: req.body.descricao,
            imgUrl: imgUrl,
            alt: description,
        }

        const updatedPost = await updatingPost(id, postUpdated);
        
        res.status(200).json(updatedPost);
        console.log("updatedPost==>", updatedPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "Falha na requisição" });
    };
};