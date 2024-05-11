// Copyright 2024 Johannes Thorén. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import client from "@prisma/prismadb";




export default async function () {
    let incidents = await client.incidents.findMany({ where: { active: true }, include: { service: true } });




    return (
        <>
            <ul role="list">
                {incidents.map((incident) => (
                    <li key={incident.id} className=" shadow-md rounded-md px-4 flex justify-between gap-x-5 my-2 py-5">
                        <div className="shrink-0 flex min-w-2 gap-x-4 items-center">
                            <div className="min-w-0 flex-auto">
                                <p className="font-semibold leading-6 text-white-900">{incident.location}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{incident.description} • {incident.service.name}</p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center">
                            <p className="mt-1 text-xs leading-5  text-gray-500 text-center">{incident.additional_information}</p>
                        </div>
                        <div className="shrink-0 flex items-center">
                            <div>
                                <p className="text-sm leading-6 text-gray-500">S: {incident.start_time.toLocaleTimeString()}</p>
                                <p className="text-sm leading-6 text-gray-500">E: {incident.end_time?.toLocaleTimeString()}</p>

                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>

    )
}