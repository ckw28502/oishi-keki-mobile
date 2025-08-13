interface GetCakesDTO {
    page: number,
    limit: number,
    nameFilter: string,
    sortParam: string,
    isAscending: boolean
}

export default GetCakesDTO;