import React, { useState, useEffect, useContext } from 'react';
import Category from './Category';
import { MenuContext } from '../../../../context/MenuContext';

function Sidebar({ categories }) {
    const { setChosenCategory, GetMealsByCategory, chosenCategory } = useContext(MenuContext);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!categories.length) return;
            
            let newIndex = selectedIndex;

            if (event.key === 'ArrowDown') {
                newIndex = selectedIndex === null ? 0 : (selectedIndex + 1) % categories.length;
            } else if (event.key === 'ArrowUp') {
                newIndex = selectedIndex === null ? categories.length - 1 : (selectedIndex - 1 + categories.length) % categories.length;
            }

            if (newIndex !== selectedIndex) {
                setSelectedIndex(newIndex);
                setChosenCategory({ name: categories[newIndex].categoryName, _id: categories[newIndex]._id });
                GetMealsByCategory(categories[newIndex]._id); // ✅ עכשיו הקריאה מתבצעת מיידית!
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [categories, selectedIndex]);

    const handleCategoryClick = (index, category) => {
        setSelectedIndex(index);
        setChosenCategory({ name: category.categoryName, _id: category._id });
        GetMealsByCategory(category._id);
    };

    return (
        <div className='space-y-0.5'>
            {categories.map((cat, index) => (
                <Category
                    key={cat._id}
                    {...cat}
                    isSelected={chosenCategory?.name === cat.categoryName}
                    onClick={() => handleCategoryClick(index, cat)}
                />
            ))}
        </div>
    );
}

export default Sidebar;
