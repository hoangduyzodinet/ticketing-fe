import React, { useEffect, useState } from "react";
import { SliderShow } from "../../components/modules";
import EventList from "../../components/modules/event-list/event-list";
import { ICategory } from "../../interfaces";
import { EventApi } from "../../services";

const eventApi = new EventApi();

export const HomePageTemplate: React.FC = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const getCategory = async () => {
            const result = await eventApi.getAllCategory();
            if (result) setCategories(result);
        };
        getCategory();
    }, []);

    return (
        <>
            <SliderShow />
            {categories.length > 0 &&
                categories.map((category) => (
                    <EventList
                        id={category.id}
                        key={category.id}
                        name={category.name}
                    />
                ))}
        </>
    );
};
