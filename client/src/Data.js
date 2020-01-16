import config from './config';

export default class Data {
    /**
     * @param path
     * @param method
     * @param body
     * @param requiresAuth
     * @param credentials
     * @returns {Promise<Response>}
     */
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseURL + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }
        if (requiresAuth){
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
    }

    /**
     *
     * @returns {Promise<any>} a promise that returns courses if the request is successful(200) else an error is thrown
     */
    async getCourses() {
        const response = await this.api(`/courses`, 'GET', null);
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 500) {
            return response.json().then(data => {
                return data.errors;
            });
        }

        else {
            throw new Error();
        }
    }

    /**
     *
     * @param id Course id
     * @returns {Promise<any>} returns course object if the request is successful)(200)
     *                          returns error object for bad request(404)
     */
    async getCourse(id) {
        const response = await this.api(`/courses/${id}`, 'GET', null);
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 404) {
            return response.json().then(data => {
                return data;
            });
        }
        else {
            throw new Error();
        }
    }

    /**
     *
     * @param emailAddress
     * @param password
     * @returns {Promise<null|any>} returns user object for successful request(200)
     *                              returns null for bad request
     */

    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    /**
     *
     * @param user
     * @returns {Promise<any|*[]>} returns [] for successful request(201)
     *                              returns validation errors if the request object don't contain required values
     */

    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }

        else {
            throw new Error();
        }
    }

    /**
     *
     * @param course
     * @param user
     * @returns {Promise<any|*[]>} returns [] for successful request(201)
     *                              returns validation errors if the request object don't contain required values
     */
    async createCourse(course, user) {
        const emailAddress = user.emailAddress;
        const password = user.password;
        const response = await this.api('/courses', 'POST', course,true, {emailAddress, password});
        if (response.status === 201) {
            return [];
        }
        else if(response.status === 401){
            return response.json().then(data => {
                return data.errors;
            });
        }
        else if (response.status === 400){
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    /**
     *
     * @param course
     * @param id
     * @param user
     * @returns {Promise<any|*[]>} returns [] for successful request(201)
     *                              returns validation errors if the request object don't contain required values
     */
    async updateCourse(course,id, user) {
        const emailAddress = user.emailAddress;
        const password = user.password;

        const response = await this.api(`/courses/${id}`, 'PUT', course,true, {emailAddress, password});
        if (response.status === 204) {
            return [];
        }
        else if(response.status === 401){
            return response.json().then(data => {
                return data.errors;
            });
        }
        else if (response.status === 400){
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    /**
     *
     * @param id
     * @param user
     * @returns {Promise<any|*[]>} returns [] for successful request(201)
     *                              returns errors object for bad request(401: Unauthorized access)
     */
    async deleteCourse(id, user) {
        const emailAddress = user.emailAddress;
        const password = user.password;

        const response = await this.api(`/courses/${id}`, 'DELETE', null,true, {emailAddress, password});
        if (response.status === 204) {
            return [];
        }
        else if(response.status === 401){
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }
}
