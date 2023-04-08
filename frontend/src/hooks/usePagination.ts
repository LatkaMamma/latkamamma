/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";

export type UsePaginationOptions = {
    initialPage?: number;
    page?: number;
    total: number;
    siblings?: number;
    boundaries?: number;
    onChange?: (page: number) => void;
    loop?: boolean;
    useRange?: boolean;
}

export function usePagination(options: UsePaginationOptions) {
    const {
        initialPage = 1,
        page,
        total,
        siblings = 1,
        boundaries = 1,
        onChange,
        loop = false,
        useRange = true,
    } = options;

    const [active, setActive] = useState(initialPage);
    const setPage = useCallback((page: number) => {
        if (page !== active) {
            setActive(page);
            onChange && onChange(page);
        }
    }, [active]);
    const next = useCallback(() => {
        if (active < total) {
            setPage(active + 1);
        } else if (loop) {
            setPage(1);
        }
    }, [active, total]);
    const previous = useCallback(() => {
        if (active > 1) {
            setPage(active - 1);
        } else if (loop) {
            setPage(total);
        }
    }, [active]);
    const first = useCallback(() => {
        setPage(1);
    }, []);
    const last = useCallback(() => {
        setPage(total);
    }, [total]);

    const range = (start: number, end: number) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
    const getRange = useCallback(() => {
        if (!useRange) {
            return [];
        }
        const _range: (number | 'dots')[] = [];

        if (total <= 2 * (siblings + boundaries) + 6) {
            _range.push(...range(1, total));
        } else {
            const leftBoundariesEnd = Math.min(boundaries, total);
            const rightBoundariesStart = Math.max(total - boundaries + 1, 1);

            const leftSiblingsEnd = Math.min(active - siblings, total);
            const leftSiblingsStart = Math.max(1, leftSiblingsEnd - 2 * siblings);
            const rightSiblingsStart = Math.max(active + siblings, 1);
            const rightSiblingsEnd = Math.min(total, rightSiblingsStart + 2 * siblings);

            const shouldShowLeftDots = leftSiblingsStart > leftBoundariesEnd + 1;
            const shouldShowRightDots = rightSiblingsEnd < rightBoundariesStart - 1;

            _range.push(...range(1, leftBoundariesEnd));

            if (shouldShowLeftDots) {
                _range.push('dots');
            }

            _range.push(...range(leftSiblingsStart, leftSiblingsEnd));
            _range.push(active);
            _range.push(...range(rightSiblingsStart, rightSiblingsEnd));

            if (shouldShowRightDots) {
                _range.push('dots');
            }

            _range.push(...range(rightBoundariesStart, total));
        }

        return _range;
    }, [active, total, siblings, boundaries, useRange]);

    useEffect(() => {
        page && setPage(page);
    }, [page]);

    return {
        range: getRange(),
        active,
        setPage,
        next,
        previous,
        first,
        last,
    }
}